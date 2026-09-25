import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 130,
  },

  header: {
    marginBottom: 28,
  },

  eyebrow: {
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },

  subtitle: {
    color: '#aaa9b8',
    fontSize: 15,
    lineHeight: 22,
  },

  questCard: {
    backgroundColor: '#191923',
    borderWidth: 1,
    borderColor: '#292936',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  questTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  questCategory: {
    color: '#c4b5fd',
    fontSize: 12,
    fontWeight: '700',
  },

  questRealm: {
    color: '#8b8a99',
    fontSize: 12,
    fontWeight: '600',
  },

  questTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  questDescription: {
    color: '#aaa9b8',
    fontSize: 14,
    lineHeight: 21,
  },

  questMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
  },

  metaText: {
    color: '#9ca3af',
    fontSize: 13,
  },

  xpText: {
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '700',
  },

  questButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  questButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;