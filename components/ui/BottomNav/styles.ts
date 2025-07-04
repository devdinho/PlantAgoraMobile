import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    navText: {
        fontSize: 12,
        color: '#666666',
        marginTop: 4,
    },
    activeNavText: {
        color: '#0c8b56',
        fontWeight: '500',
    },
});

export default styles;