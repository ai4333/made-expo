import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  currentUser,
  notifications as seedTenantNotifications,
  pgListings,
  recentComplaints,
} from '../data/mockData';
import {
  ownerExpenses as seedOwnerExpenses,
  ownerNotifications as seedOwnerNotifications,
  ownerProfile,
} from '../data/ownerMockData';
import { getFirebaseServices, isFirebaseConfigured } from '../services/firebase/client';

const AppDataContext = createContext(null);
const STORAGE_KEY = '@staazy_app_state_v2';
const FIRESTORE_COLLECTION = 'staazy_demo';
const FIRESTORE_DOC = 'app_state_v1';

function createMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatTime(ts) {
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 60 * 1000) return 'Just now';
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
  return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d ago`;
}

function formatDateLabel(ts) {
  const date = new Date(ts);
  return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
}

function getDefaultTenantNotifications() {
  return seedTenantNotifications.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    message: item.message,
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    read: item.read,
  }));
}

function getDefaultOwnerNotifications() {
  return seedOwnerNotifications.map((item, index) => ({
    id: item.id,
    type: item.type,
    message: item.message,
    ...(item.action ? { action: item.action } : {}),
    createdAt: Date.now() - (index + 1) * 60 * 60 * 1000,
    read: item.read,
  }));
}

function getDefaultComplaints() {
  return recentComplaints.map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    status: item.status,
    priority: index % 2 === 0 ? 'Normal' : 'Urgent',
    createdAt: Date.now() - (index + 1) * 24 * 60 * 60 * 1000,
    tenantId: currentUser.id,
    tenantName: currentUser.name,
  }));
}

function toPersistedState(payload) {
  return JSON.stringify(payload);
}

function sortValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortValue(item));
  }
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortValue(value[key]);
        return acc;
      }, {});
  }
  return value;
}

function toComparableState(payload) {
  return JSON.stringify(sortValue(payload));
}

function fromPersistedState(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function pickPersistableState(payload) {
  return {
    tenantProfile: payload.tenantProfile,
    joinedPgId: payload.joinedPgId,
    messages: payload.messages,
    savedPgIds: payload.savedPgIds,
    tenantNotifications: payload.tenantNotifications,
    ownerNotifications: payload.ownerNotifications,
    tenantComplaints: payload.tenantComplaints,
    ownerExpenses: payload.ownerExpenses,
  };
}

function sanitizeForFirestore(value) {
  if (value === undefined) return null;
  if (value === null) return null;
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForFirestore(item));
  }
  if (typeof value === 'object') {
    const next = {};
    Object.entries(value).forEach(([key, val]) => {
      if (val !== undefined) {
        next[key] = sanitizeForFirestore(val);
      }
    });
    return next;
  }
  return value;
}

export function AppDataProvider({ children }) {
  const firebaseEnabled = isFirebaseConfigured();
  const firebaseServicesRef = useRef(firebaseEnabled ? getFirebaseServices() : null);
  const firestoreDocRef = useRef(
    firebaseServicesRef.current
      ? doc(firebaseServicesRef.current.db, FIRESTORE_COLLECTION, FIRESTORE_DOC)
      : null
  );
  const latestSerializedRef = useRef('');
  const lastRemoteSerializedRef = useRef('');
  const isApplyingRemoteRef = useRef(false);

  const [tenantProfile, setTenantProfile] = useState({
    id: currentUser.id,
    name: currentUser.name,
    phone: currentUser.phone,
    age: currentUser.age,
    gender: currentUser.gender,
  });
  const [joinedPgId, setJoinedPgId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [savedPgIds, setSavedPgIds] = useState(
    pgListings.filter((pg) => pg.saved).map((pg) => pg.id)
  );
  const [tenantNotifications, setTenantNotifications] = useState(getDefaultTenantNotifications());
  const [ownerNotifications, setOwnerNotifications] = useState(getDefaultOwnerNotifications());
  const [tenantComplaints, setTenantComplaints] = useState(getDefaultComplaints());
  const [ownerExpenses, setOwnerExpenses] = useState(seedOwnerExpenses);
  const [isHydrated, setIsHydrated] = useState(false);
  const [syncMode, setSyncMode] = useState(firebaseEnabled ? 'firebase-pending' : 'local');

  const applyStatePayload = (parsed) => {
    if (!parsed) return;
    if (parsed.tenantProfile) setTenantProfile(parsed.tenantProfile);
    if (typeof parsed.joinedPgId === 'string' || parsed.joinedPgId === null) setJoinedPgId(parsed.joinedPgId);
    if (Array.isArray(parsed.messages)) setMessages(parsed.messages);
    if (Array.isArray(parsed.savedPgIds)) setSavedPgIds(parsed.savedPgIds);
    if (Array.isArray(parsed.tenantNotifications)) setTenantNotifications(parsed.tenantNotifications);
    if (Array.isArray(parsed.ownerNotifications)) setOwnerNotifications(parsed.ownerNotifications);
    if (Array.isArray(parsed.tenantComplaints)) setTenantComplaints(parsed.tenantComplaints);
    if (Array.isArray(parsed.ownerExpenses)) setOwnerExpenses(parsed.ownerExpenses);
  };

  const persistablePayload = useMemo(
    () =>
      pickPersistableState({
        tenantProfile,
        joinedPgId,
        messages,
        savedPgIds,
        tenantNotifications,
        ownerNotifications,
        tenantComplaints,
        ownerExpenses,
      }),
    [
      joinedPgId,
      messages,
      ownerExpenses,
      ownerNotifications,
      savedPgIds,
      tenantComplaints,
      tenantNotifications,
      tenantProfile,
    ]
  );

  const firestorePayload = useMemo(
    () => sanitizeForFirestore(persistablePayload),
    [persistablePayload]
  );

  const serializedPayload = useMemo(() => toPersistedState(persistablePayload), [persistablePayload]);
  const comparablePayload = useMemo(() => toComparableState(persistablePayload), [persistablePayload]);

  useEffect(() => {
    latestSerializedRef.current = comparablePayload;
  }, [comparablePayload]);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = raw ? fromPersistedState(raw) : null;
        if (!mounted) {
          setIsHydrated(true);
          return;
        }

        if (parsed) {
          applyStatePayload(parsed);
          lastRemoteSerializedRef.current = toComparableState(pickPersistableState(parsed));
        }
      } catch (error) {
      } finally {
        if (mounted) setIsHydrated(true);
      }
    };

    hydrate();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, serializedPayload);
  }, [isHydrated, serializedPayload]);

  useEffect(() => {
    if (!isHydrated || !firebaseServicesRef.current || !firestoreDocRef.current) return;

    let alive = true;
    const unsubscribe = onSnapshot(
      firestoreDocRef.current,
      async (snapshot) => {
        if (!alive) return;
        const remotePayload = snapshot.data()?.appState;

        if (!remotePayload) {
          try {
            await setDoc(
              firestoreDocRef.current,
              {
                appState: firestorePayload,
                source: 'mobile-demo',
                updatedAt: serverTimestamp(),
              },
              { merge: true }
            );
            lastRemoteSerializedRef.current = comparablePayload;
            setSyncMode('firebase');
          } catch (error) {
            setSyncMode('local');
          }
          return;
        }

        const remoteSerialized = toComparableState(pickPersistableState(remotePayload));
        lastRemoteSerializedRef.current = remoteSerialized;

        if (remoteSerialized === latestSerializedRef.current) {
          setSyncMode('firebase');
          return;
        }

        isApplyingRemoteRef.current = true;
        applyStatePayload(remotePayload);
        isApplyingRemoteRef.current = false;
        setSyncMode('firebase');
      },
      () => {
        if (alive) setSyncMode('local');
      }
    );

    return () => {
      alive = false;
      unsubscribe();
    };
  }, [isHydrated, firestorePayload, comparablePayload]);

  useEffect(() => {
    if (!isHydrated || !firebaseServicesRef.current || !firestoreDocRef.current) return;
    if (isApplyingRemoteRef.current) return;
    if (comparablePayload === lastRemoteSerializedRef.current) return;

    try {
      setDoc(
        firestoreDocRef.current,
        {
          appState: firestorePayload,
          source: 'mobile-demo',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
        .then(() => {
          lastRemoteSerializedRef.current = comparablePayload;
          setSyncMode('firebase');
        })
        .catch(() => {
          setSyncMode('local');
        });
    } catch (error) {
      setSyncMode('local');
    }
  }, [isHydrated, firestorePayload, comparablePayload]);

  const joinedPg = useMemo(
    () => pgListings.find((pg) => pg.id === joinedPgId) || null,
    [joinedPgId]
  );

  const updateTenantProfile = (payload) => {
    setTenantProfile((prev) => ({ ...prev, ...payload }));
  };

  const pushTenantNotification = ({ type, title, message }) => {
    setTenantNotifications((prev) => [
      {
        id: createId('tn'),
        type,
        title,
        message,
        createdAt: Date.now(),
        read: false,
      },
      ...prev,
    ]);
  };

  const pushOwnerNotification = ({ type, message, action }) => {
    setOwnerNotifications((prev) => [
      {
        id: createId('on'),
        type,
        message,
        ...(action ? { action } : {}),
        createdAt: Date.now(),
        read: false,
      },
      ...prev,
    ]);
  };

  const joinPG = (pgId) => {
    const pg = pgListings.find((item) => item.id === pgId);
    if (!pg) return { ok: false, error: 'PG not found' };

    setJoinedPgId(pgId);
    setMessages((prev) => {
      const hasWelcome = prev.some(
        (msg) =>
          msg.tenantId === tenantProfile.id &&
          msg.pgId === pgId &&
          msg.senderRole === 'owner' &&
          msg.kind === 'welcome'
      );
      if (hasWelcome) return prev;

      return [
        ...prev,
        {
          id: createMessageId(),
          kind: 'welcome',
          tenantId: tenantProfile.id,
          tenantName: tenantProfile.name,
          pgId,
          pgName: pg.name,
          ownerName: pg.owner?.name || ownerProfile.name,
          senderRole: 'owner',
          senderName: pg.owner?.name || ownerProfile.name,
          text: `Hi ${tenantProfile.name}, welcome to ${pg.name}. Tell me if you need any help.`,
          createdAt: Date.now(),
          readByOwner: true,
          readByTenant: false,
        },
      ];
    });

    pushTenantNotification({
      type: 'join_pg',
      title: 'PG Joined Successfully',
      message: `You joined ${pg.name}. You can now chat with the owner.`,
    });

    pushOwnerNotification({
      type: 'new_join',
      message: `${tenantProfile.name} joined ${pg.name}`,
      action: 'Review Tenant',
    });

    return { ok: true };
  };

  const sendTenantMessage = (text) => {
    const cleanText = String(text || '').trim();
    if (!cleanText) return { ok: false, error: 'Type a message first' };
    if (!joinedPgId) return { ok: false, error: 'Join a PG first to message owner' };

    const pg = pgListings.find((item) => item.id === joinedPgId);
    if (!pg) return { ok: false, error: 'Invalid PG selected' };

    const nextMessage = {
      id: createMessageId(),
      tenantId: tenantProfile.id,
      tenantName: tenantProfile.name,
      pgId: pg.id,
      pgName: pg.name,
      ownerName: pg.owner?.name || ownerProfile.name,
      senderRole: 'tenant',
      senderName: tenantProfile.name,
      text: cleanText,
      createdAt: Date.now(),
      readByOwner: false,
      readByTenant: true,
    };

    setMessages((prev) => [...prev, nextMessage]);
    pushOwnerNotification({
      type: 'tenant_message',
      message: `${tenantProfile.name}: ${cleanText}`,
      action: 'Open Messages',
    });
    return { ok: true };
  };

  const sendOwnerReply = (tenantId, text) => {
    const cleanText = String(text || '').trim();
    if (!cleanText) return { ok: false, error: 'Type a message first' };

    const threadMessages = messages.filter((msg) => msg.tenantId === tenantId);
    const latest = threadMessages[threadMessages.length - 1];
    if (!latest) return { ok: false, error: 'No tenant thread found' };

    const replyMessage = {
      id: createMessageId(),
      tenantId,
      tenantName: latest.tenantName,
      pgId: latest.pgId,
      pgName: latest.pgName,
      ownerName: latest.ownerName || ownerProfile.name,
      senderRole: 'owner',
      senderName: latest.ownerName || ownerProfile.name,
      text: cleanText,
      createdAt: Date.now(),
      readByOwner: true,
      readByTenant: false,
    };

    setMessages((prev) => [...prev, replyMessage]);
    pushTenantNotification({
      type: 'owner_reply',
      title: 'Owner Replied',
      message: `${replyMessage.senderName}: ${cleanText}`,
    });
    return { ok: true };
  };

  const markOwnerThreadRead = (tenantId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.tenantId === tenantId && msg.senderRole === 'tenant'
          ? { ...msg, readByOwner: true }
          : msg
      )
    );
  };

  const markTenantThreadRead = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.tenantId === tenantProfile.id && msg.senderRole === 'owner'
          ? { ...msg, readByTenant: true }
          : msg
      )
    );
  };

  const markTenantNotificationRead = (id) => {
    setTenantNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllTenantNotificationsRead = () => {
    setTenantNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const markOwnerNotificationRead = (id) => {
    setOwnerNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllOwnerNotificationsRead = () => {
    setOwnerNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const submitTenantComplaint = ({ title, category }) => {
    const cleanTitle = String(title || '').trim();
    if (!cleanTitle) return { ok: false, error: 'Complaint title is required' };

    const complaint = {
      id: createId('cmp'),
      title: cleanTitle,
      category: category || 'Other',
      status: 'Pending',
      priority: 'Normal',
      createdAt: Date.now(),
      tenantId: tenantProfile.id,
      tenantName: tenantProfile.name,
    };

    setTenantComplaints((prev) => [complaint, ...prev]);
    pushOwnerNotification({
      type: 'new_complaint',
      message: `New complaint from ${tenantProfile.name}: ${cleanTitle}`,
      action: 'Review',
    });
    pushTenantNotification({
      type: 'complaint_submitted',
      title: 'Complaint Submitted',
      message: `${cleanTitle} has been shared with the owner.`,
    });
    return { ok: true };
  };

  const advanceOwnerComplaintStatus = (complaintId) => {
    let updatedComplaint = null;
    setTenantComplaints((prev) =>
      prev.map((item) => {
        if (item.id !== complaintId) return item;
        const nextStatus = item.status === 'Pending' ? 'In Progress' : 'Resolved';
        updatedComplaint = { ...item, status: nextStatus };
        return updatedComplaint;
      })
    );

    if (!updatedComplaint) return { ok: false, error: 'Complaint not found' };

    pushTenantNotification({
      type: 'complaint_update',
      title: 'Complaint Updated',
      message: `${updatedComplaint.title} is now ${updatedComplaint.status}.`,
    });
    return { ok: true };
  };

  const toggleSavedPg = (pgId) => {
    setSavedPgIds((prev) => (prev.includes(pgId) ? prev.filter((id) => id !== pgId) : [...prev, pgId]));
  };

  const addOwnerExpense = ({ amount, category }) => {
    const parsedAmount = Number(amount);
    if (!parsedAmount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return { ok: false, error: 'Enter a valid amount' };
    }

    const entry = {
      id: createId('exp'),
      pgId: ownerProfile.id,
      pgName: joinedPg?.name || pgListings[0]?.name || 'PG Property',
      category: category || 'Maintenance',
      amount: parsedAmount,
      date: new Date().toISOString().slice(0, 10),
      notes: 'Added from mobile app',
      icon:
        category === 'Electricity'
          ? '⚡'
          : category === 'Water'
            ? '💧'
            : category === 'Groceries'
              ? '🛒'
              : '🔧',
    };
    setOwnerExpenses((prev) => [entry, ...prev]);
    return { ok: true };
  };

  const tenantConversation = useMemo(() => {
    return messages
      .filter((msg) => msg.tenantId === tenantProfile.id)
      .sort((a, b) => a.createdAt - b.createdAt)
      .map((msg) => ({ ...msg, timeLabel: formatTime(msg.createdAt) }));
  }, [messages, tenantProfile.id]);

  const tenantComplaintsForUser = useMemo(() => {
    return tenantComplaints
      .filter((item) => item.tenantId === tenantProfile.id)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((item) => ({
        ...item,
        date: formatDateLabel(item.createdAt),
      }));
  }, [tenantComplaints, tenantProfile.id]);

  const ownerComplaints = useMemo(() => {
    return tenantComplaints
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((item) => ({
        id: item.id,
        tenant: item.tenantName,
        room: joinedPg?.id === joinedPgId ? 'Allocated' : 'N/A',
        title: item.title,
        status: item.status,
        priority: item.priority,
      }));
  }, [tenantComplaints, joinedPg, joinedPgId]);

  const tenantNotificationsFeed = useMemo(() => {
    return tenantNotifications
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((item) => ({ ...item, time: formatRelativeTime(item.createdAt) }));
  }, [tenantNotifications]);

  const ownerNotificationsFeed = useMemo(() => {
    return ownerNotifications
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((item) => ({ ...item, time: formatRelativeTime(item.createdAt) }));
  }, [ownerNotifications]);

  const ownerExpenseEntries = useMemo(() => {
    return ownerExpenses.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [ownerExpenses]);

  const ownerThreads = useMemo(() => {
    if (!messages.length) return [];

    const grouped = new Map();
    messages.forEach((msg) => {
      const existing = grouped.get(msg.tenantId);
      const isNewer = !existing || msg.createdAt > existing.latest.createdAt;
      if (!existing) {
        grouped.set(msg.tenantId, {
          tenantId: msg.tenantId,
          tenantName: msg.tenantName,
          pgName: msg.pgName,
          latest: msg,
          unread: msg.senderRole === 'tenant' && !msg.readByOwner ? 1 : 0,
        });
      } else {
        existing.unread += msg.senderRole === 'tenant' && !msg.readByOwner ? 1 : 0;
        if (isNewer) existing.latest = msg;
      }
    });

    return Array.from(grouped.values())
      .sort((a, b) => b.latest.createdAt - a.latest.createdAt)
      .map((thread) => ({
        tenantId: thread.tenantId,
        tenantName: thread.tenantName,
        pgName: thread.pgName,
        latestText: thread.latest.text,
        latestSenderRole: thread.latest.senderRole,
        latestAt: thread.latest.createdAt,
        latestTimeLabel: formatTime(thread.latest.createdAt),
        unread: thread.unread,
      }));
  }, [messages]);

  const getOwnerConversation = (tenantId) => {
    return messages
      .filter((msg) => msg.tenantId === tenantId)
      .sort((a, b) => a.createdAt - b.createdAt)
      .map((msg) => ({ ...msg, timeLabel: formatTime(msg.createdAt) }));
  };

  const value = {
    backend: {
      configured: firebaseEnabled,
      mode: syncMode,
      connected: syncMode === 'firebase',
    },
    tenantProfile,
    updateTenantProfile,
    isHydrated,
    hasJoinedPg: Boolean(joinedPg),
    joinedPgId,
    joinedPg,
    joinPG,
    savedPgIds,
    toggleSavedPg,
    tenantConversation,
    sendTenantMessage,
    markTenantThreadRead,
    tenantNotifications: tenantNotificationsFeed,
    markTenantNotificationRead,
    markAllTenantNotificationsRead,
    tenantComplaints: tenantComplaintsForUser,
    submitTenantComplaint,
    ownerThreads,
    getOwnerConversation,
    markOwnerThreadRead,
    sendOwnerReply,
    ownerNotifications: ownerNotificationsFeed,
    markOwnerNotificationRead,
    markAllOwnerNotificationsRead,
    ownerComplaints,
    advanceOwnerComplaintStatus,
    ownerExpenseEntries,
    addOwnerExpense,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }
  return ctx;
}
