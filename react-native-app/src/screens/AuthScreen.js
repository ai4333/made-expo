import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PremiumIcon from '../components/shared/PremiumIcon';
import { useAppData } from '../context/AppDataContext';

function StepHeader({ title, subtitle, onBack }) {
  const { C } = useTheme();
  return (
    <View style={styles.headerWrap}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={[styles.backBtn, { backgroundColor: C.card, borderColor: C.border }]}>
          <PremiumIcon name="chevron-back" size={20} color={C.body} />
        </TouchableOpacity>
      ) : null}
      <Text style={[styles.headerTitle, { color: C.heading }]}>{title}</Text>
      <Text style={[styles.headerSub, { color: C.muted }]}>{subtitle}</Text>
    </View>
  );
}

export default function AuthScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const { updateTenantProfile } = useAppData();
  const [step, setStep] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const otpRefs = useRef([]);

  const proceedProfile = () => {
    updateTenantProfile({
      name: name.trim() || 'Amit Kumar',
      age: Number(age || 24),
      gender,
      phone: `+91 ${phone || '9876543210'}`,
    });
    navigation.replace('VibeCalibration');
  };

  const onOtpChange = (value, index) => {
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: C.bg }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {step === 'login' ? (
          <>
            <StepHeader title="Login" subtitle="Enter your phone number" />
            <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={[styles.label, { color: C.body }]}>Phone Number</Text>
              <View style={[styles.rowInput, { borderColor: C.border, backgroundColor: C.elevated }]}>
                <Text style={[styles.code, { color: C.body }]}>+91</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="9876543210"
                  placeholderTextColor={C.muted}
                  style={[styles.inputPlain, { color: C.heading }]}
                />
              </View>

              <TouchableOpacity
                style={[styles.primary, { backgroundColor: phone.length === 10 ? C.primary : (isDark ? 'rgba(255,255,255,0.05)' : C.border), opacity: phone.length === 10 ? 1 : 0.5 }]}
                disabled={phone.length !== 10}
                onPress={() => setStep('otp')}
              >
                <Text style={[styles.primaryText, { color: phone.length === 10 ? '#FFFFFF' : C.muted }]}>Send OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep('profile')} style={styles.secondaryLink}>
                <Text style={[styles.secondaryLinkText, { color: C.primary }]}>Continue Demo (Skip OTP)</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}

        {step === 'otp' ? (
          <>
            <StepHeader title="Verify OTP" subtitle={`Code sent to +91 ${phone}`} onBack={() => setStep('login')} />
            <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}>
              <View style={styles.otpRow}>
                {otp.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={(r) => {
                      otpRefs.current[idx] = r;
                    }}
                    value={digit}
                    onChangeText={(v) => onOtpChange(v, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, { borderColor: digit ? C.primary : C.border, backgroundColor: C.primaryGhost, color: C.heading }]}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={[styles.primary, { backgroundColor: otp.join('').length === 6 ? C.primary : (isDark ? 'rgba(255,255,255,0.05)' : C.border), opacity: otp.join('').length === 6 ? 1 : 0.5 }]}
                disabled={otp.join('').length !== 6}
                onPress={() => setStep('profile')}
              >
                <Text style={[styles.primaryText, { color: otp.join('').length === 6 ? '#FFFFFF' : C.muted }]}>Verify</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}

        {step === 'profile' ? (
          <>
            <StepHeader title="Profile Setup" subtitle="Complete your profile" onBack={() => setStep(phone ? 'otp' : 'login')} />
            <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}>
              <Text style={[styles.label, { color: C.body }]}>Full Name</Text>
              <TextInput value={name} onChangeText={setName} placeholder="Amit Kumar" placeholderTextColor={C.muted} style={[styles.input, { borderColor: C.border, color: C.heading, backgroundColor: C.elevated }]} />

              <Text style={[styles.label, { color: C.body }]}>Age</Text>
              <TextInput value={age} onChangeText={setAge} keyboardType="number-pad" placeholder="24" placeholderTextColor={C.muted} style={[styles.input, { borderColor: C.border, color: C.heading, backgroundColor: C.elevated }]} />

              <Text style={[styles.label, { color: C.body }]}>Gender</Text>
              <View style={styles.genderRow}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setGender(g)}
                    style={[styles.genderPill, { backgroundColor: gender === g ? C.primaryGhost : (isDark ? 'rgba(255,255,255,0.03)' : C.bg), borderColor: gender === g ? C.primary : C.border }]}
                  >
                    <Text style={[styles.genderText, { color: gender === g ? C.primary : C.body }]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.primary, { backgroundColor: (name.trim() && age) ? C.primary : (isDark ? 'rgba(255,255,255,0.05)' : C.border), opacity: name.trim() && age ? 1 : 0.7 }]}
                onPress={proceedProfile}
              >
                <Text style={[styles.primaryText, { color: (name.trim() && age) ? '#FFFFFF' : C.muted }]}>Continue</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 56, paddingBottom: 30 },
  headerWrap: { marginBottom: 16 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 26, fontWeight: '800' },
  headerSub: { fontSize: 14, marginTop: 2 },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  label: { fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: 8 },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  code: { fontWeight: '700', marginRight: 10 },
  inputPlain: { flex: 1, fontSize: 15 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  primary: {
    marginTop: 16,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { fontWeight: '700', fontSize: 15 },
  secondaryLink: { marginTop: 10, alignSelf: 'center' },
  secondaryLinkText: { fontWeight: '700', fontSize: 13 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  otpBox: {
    width: 44,
    height: 52,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  genderRow: { flexDirection: 'row', marginTop: 6 },
  genderPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  genderText: { fontWeight: '600', fontSize: 12 },
});
