export default interface Supermarket{
  _id: string;
  name: string;
  address: {
    type: string
    coordinates: number[]
  }
}
