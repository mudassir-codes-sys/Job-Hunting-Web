import Image from "next/image";
function NotFoundComp() {
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full max-h-screen ">
          <Image
            src="/not-found.jpg"
            alt="Not Found"
            fill
            className="object-cover grayscale"
          />
        </div>
        <div className="fixed bg-black opacity-60 inset-0 "></div>
        <div className="absolute text-white w-1/2 h-screen flex flex-col justify-center max-w-lg gap-5 ml-14 leading-relaxed ">
          <h1 className="text-5xl leading-14  font-bold">
            Not all those who wonder are lost.
          </h1>
          <h3 className="text-2xl font-semibold">--J.R.R.Tolkein </h3>
          <p className="text-lg">
            We could not find the page you were looking for{" "}
            <span className="text-red-600 font-bold text-xl">(Error 404)</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default NotFoundComp;
