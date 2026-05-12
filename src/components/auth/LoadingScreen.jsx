const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl text-center">
        <div className="text-6xl mb-4">🥕</div>

        <p className="font-bold text-xl">Đang chuẩn bị cà rốt...</p>

        <p>Đang đánh thức bé thỏ của bạn...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
