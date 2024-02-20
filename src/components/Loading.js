import LoadingImage from "../asset/loading.gif"
function Loading() {
  return (
    <div className="flex justify-center h-[100vh]">
        <img className="h-[300px] m-auto" src={LoadingImage} />
    </div>
  );
}

export default Loading;
