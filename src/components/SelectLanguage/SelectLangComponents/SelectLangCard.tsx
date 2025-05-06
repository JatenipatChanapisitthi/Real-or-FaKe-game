import ButtonStart from "../ui/ButtonStart";
import ButtonRule from "../ui/ButtonRule";
import ButtonContact from "../ui/ButtonContact";
import ButtonShare from "../ui/ButtonShare";
import ToggleLang from "../ui/ToggleLang";

const SelectLangCard = () => {
  return (
    <div className="flex flex-col justify-center bg-white gap-2 border border-gray-200 rounded-sm p-5 h-100  w-90 md:w-120">
      <div className="flex flex-col justify-between gap-12">
        <div className="text-2xl font-bold text-center">
          <h1>Select Language</h1>
        </div>

        <div className="flex items-center justify-center ">
          <ToggleLang />
        </div>

        <div className="flex flex-col gap-2">
          <ButtonStart />
          <ButtonRule />
          <div className="flex  gap-2">
            <ButtonShare />
            <ButtonContact />
          </div>
        </div>

      </div>
    </div>
  );
}

export default SelectLangCard
