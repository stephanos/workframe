import idGenerator from 'node-uuid';


export default function uuid() {
  return idGenerator.v1();
}
