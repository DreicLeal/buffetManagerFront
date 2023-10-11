import ChatBox from "@/components/Chat/chatBox";
import DishContainer from "@/components/DishContainer/DishContainer";
import Header from "@/components/Header/header";

export default function Saloon() {
  return (
    <>
      <Header text="Sala" />
      <DishContainer />;
      <ChatBox/>
    </>
  );
}
