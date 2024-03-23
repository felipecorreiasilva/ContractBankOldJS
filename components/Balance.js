import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'

const Balance = ({ saldo, gastos }) => {
  return (
    <MotiView
    style={styles.container}
    from={{
        rotateX: '-100deg',
        opacity: 0,
    }}
    animate={{
        rotateX: '0deg',
        opacity: 1,
    }}
    transition={{
        type: 'timing',
        delay: 300,
        duration: 900
    }}
    
    >

      <View style={styles.item} >
        <Text style={styles.itemTitle}>Conta</Text>
            <View style={styles.content} >
                
                <Text style={styles.balance}>{saldo}</Text>
            </View>
      </View>

      

    </MotiView>
  )
}

export default Balance

const styles = StyleSheet.create({
    container:{
        
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 22,
        paddingBottom: 22,
        
    },
    itemTitle:{
        fontSize: 20,
        color: 'black'
    },
    content:{
        flexDirection: 'row',
        alignItems: 'center',

    },
    
    balance:{
        fontSize:22,
        color: 'black'
    },
    


})