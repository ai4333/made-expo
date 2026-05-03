import { createBrowserRouter } from "react-router";

// Shared
import { SplashScreen } from "./pages/SplashScreen";
import { RoleSelection } from "./pages/RoleSelection";

// Tenant flow
import { MainLayout } from "./pages/MainLayout";
import { Onboarding } from "./pages/Onboarding";
import { Auth } from "./pages/Auth";
import { VibeCalibration } from "./pages/VibeCalibration";
import { Home } from "./pages/Home";
import { PGDetail } from "./pages/PGDetail";
import { RoommateProfile } from "./pages/RoommateProfile";
import { Filters } from "./pages/Filters";
import { MapDiscovery } from "./pages/MapDiscovery";
import { SavedPGs } from "./pages/SavedPGs";
import { VisitScheduling } from "./pages/VisitScheduling";
import { MyProfile } from "./pages/MyProfile";
import { Notifications } from "./pages/Notifications";
import { Chat } from "./pages/Chat";
import { MyPGPage } from "./pages/MyPGPage";
import { TenantUpdates } from "./pages/TenantUpdates";
import { TenantComplaints } from "./pages/TenantComplaints";
import { TenantMessages } from "./pages/TenantMessages";
import { TenantKYC } from "./pages/TenantKYC";
import { StudentMarketplace } from "./pages/StudentMarketplace";
import { ConnectHub } from "./pages/ConnectHub";
import { RoommateRooms } from "./pages/RoommateRooms";

// Owner flow
import { OwnerOnboarding } from "./pages/owner/OwnerOnboarding";
import { OwnerAuth } from "./pages/owner/OwnerAuth";
import { OwnerVerifyOTP } from "./pages/owner/OwnerVerifyOTP";
import { OwnerLayout } from "./pages/owner/OwnerLayout";
import { OwnerDashboard } from "./pages/owner/OwnerDashboard";
import { PGList } from "./pages/owner/PGList";
import { PGView } from "./pages/owner/PGView";
import { AddTenant } from "./pages/owner/AddTenant";
import { TenantDetail } from "./pages/owner/TenantDetail";
import { RentOverview } from "./pages/owner/RentOverview";
import { ExpenseTracker } from "./pages/owner/ExpenseTracker";
import { OwnerNotifications } from "./pages/owner/OwnerNotifications";
import { OwnerSettings } from "./pages/owner/OwnerSettings";
import { OwnerMessages } from "./pages/owner/OwnerMessages";
import { OwnerComplaints } from "./pages/owner/OwnerComplaints";
import { OwnerKYC } from "./pages/owner/OwnerKYC";
import { WhatsAppHub } from "./pages/owner/WhatsAppHub";

export const router = createBrowserRouter([
  // ── Entry (Splash) ────────────────────────────────────────────
  { path: "/", Component: SplashScreen },
  { path: "/role-selection", Component: RoleSelection },

  // ── Tenant Flow ────────────────────────────────────────────────
  { path: "/onboarding", Component: Onboarding },
  { path: "/auth", Component: Auth },
  { path: "/vibe", Component: VibeCalibration },
  { path: "/tenant/kyc", Component: TenantKYC },
  {
    path: "/tenant",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "map", Component: MapDiscovery },
      { path: "mypg", Component: MyPGPage },
      { path: "explore", Component: StudentMarketplace },
      { path: "connect", Component: ConnectHub },
      { path: "saved", Component: SavedPGs },
      { path: "chat", Component: Chat },
      { path: "profile", Component: MyProfile },
    ],
  },
  { path: "/pg/:id", Component: PGDetail },
  { path: "/pg/:id/schedule", Component: VisitScheduling },
  { path: "/roommate/:id", Component: RoommateProfile },
  { path: "/filters", Component: Filters },
  { path: "/notifications", Component: Notifications },
  { path: "/tenant/updates", Component: TenantUpdates },
  { path: "/tenant/complaints", Component: TenantComplaints },
  { path: "/tenant/messages", Component: TenantMessages },
  { path: "/tenant/roommate-rooms", Component: RoommateRooms },

  // ── Owner Onboarding (standalone) ─────────────────────────────
  { path: "/owner/register", Component: OwnerOnboarding },
  { path: "/owner/auth", Component: OwnerAuth },
  { path: "/owner/verify-otp", Component: OwnerVerifyOTP },
  { path: "/owner/kyc", Component: OwnerKYC },

  // ── Owner App (with layout + bottom nav) ──────────────────────
  {
    path: "/owner",
    Component: OwnerLayout,
    children: [
      { index: true, Component: OwnerDashboard },
      { path: "pgs", Component: PGList },
      { path: "pg/:id", Component: PGView },
      { path: "tenant/:id", Component: TenantDetail },
      { path: "add-tenant", Component: AddTenant },
      { path: "rent", Component: RentOverview },
      { path: "expenses", Component: ExpenseTracker },
      { path: "messages", Component: OwnerMessages },
      { path: "complaints", Component: OwnerComplaints },
      { path: "notifications", Component: OwnerNotifications },
      { path: "settings", Component: OwnerSettings },
      { path: "whatsapp-hub", Component: WhatsAppHub },
    ],
  },
]);