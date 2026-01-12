const createBuffer = async (pic: File) => {
  const arrayBuffer = await pic.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};
export default createBuffer
