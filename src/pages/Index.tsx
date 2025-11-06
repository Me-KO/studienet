import Hero from "@/components/Hero";
import Checkpoints from "@/components/Checkpoints";
import MiniMapNav from "@/components/MiniMapNav";
import QuizModal from "@/components/QuizModal";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Mini Map Navigation */}
      <MiniMapNav />

      {/* Checkpoints Section */}
      <Checkpoints />

      {/* Quiz Modal */}
      <QuizModal />
    </>
  );
};

export default Index;
