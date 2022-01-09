import { ec as EC } from "elliptic";
import { v1 as uuidV1 } from "uuid"; // using v1 for random uuid as it's based on timestamp
import { SHA256 } from "crypto-js";
/**
 * Side-Note:
 * sec stands for standards of efficient cryptography
 * p stands for prime
 * 256 stands for the number of bits / 32 bytes long prime number
 * k stands for koblitz(notable mathematician in the field of cryptography)
 * 1 stands for this being the first implementation of the curve algorithm in the standard
 *
 * In this cryptography, the prime component is to generate the curve using a prime number
 */
const ec = new EC("secp256k1"); // using the elliptic cryptography algorithm that is used in bitcoin

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair(); // generates a key pair
  }

  static getUniqueId() {
    return uuidV1();
  }

  static hash(data: any) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

export default ChainUtil;
export { EC };
