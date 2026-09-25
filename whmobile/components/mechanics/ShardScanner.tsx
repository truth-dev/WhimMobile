// import React, {useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// interface Props {
//     onComplete: () => void;
// }

// const ShardScanner: React.FC<Props> = ({ onComplete}) => {
//     const [shards, setShards] = useState(0);
//     const [ isScanning, setIsScanning ] = useState(false);
//     const MAX_SHARDS = 5;

//     const handleScan = () => {
//         if (shards >= MAX_SHARDS || isScanning) return;
//         setIsScanning(true);
//         setTimeout(() => {
//         setShards((prev) => {
//             const newCount = prev + 1;
//            if(newCount >= MAX_SHARDS) {
//             onComplete();
//            }
//             return newCount;
//         });
//         setIsScanning(false);
//         }, 2000); // Simulate scanning time
//     }; 

//     return (
//         <View style={styles.container}>
//         <Text style={styles.title}>🔹 Glitched Shard Collection</Text>
//         <Text style={styles.status}>
//           {shards}/{MAX_SHARDS} shards collected
//         </Text>
  
//         <TouchableOpacity
//           style={[styles.button, shards >= MAX_SHARDS && { opacity: 0.6 }]}
//           onPress={handleScan}
//           disabled={shards >= MAX_SHARDS}
//         >
//           <Text style={styles.buttonText}>
//             {isScanning ? "Scanning..." : "Scan for Shard"}
//           </Text>
//         </TouchableOpacity>
  
//         {shards >= MAX_SHARDS && (
//           <Text style={styles.complete}>✅ All shards secured. Octavia is stabilizing…</Text>
//         )}
//       </View>
//     )
// }

// export default ShardScanner;

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: '#1a202c',
//       padding: 16,
//       borderRadius: 12,
//       borderColor: '#63e6be',
//       borderWidth: 1,
//       marginTop: 20,
//     },
//     title: {
//       fontSize: 18,
//       color: '#63e6be',
//       fontWeight: '700',
//       marginBottom: 8,
//       textAlign: 'center',
//     },
//     status: {
//       color: '#e6fffa',
//       fontSize: 14,
//       textAlign: 'center',
//       marginBottom: 10,
//     },
//     button: {
//       backgroundColor: '#319795',
//       paddingVertical: 12,
//       borderRadius: 8,
//     },
//     buttonText: {
//       color: '#ffffff',
//       textAlign: 'center',
//       fontWeight: '600',
//     },
//     complete: {
//       marginTop: 12,
//       fontSize: 14,
//       color: '#c6f6d5',
//       textAlign: 'center',
//       fontStyle: 'italic',
//     },
//   });