import React from 'react'
import ButtonCancel from '../ui/ButtonCancel';
import ButtonConfirm from '../ui/ButtonConfirm';


type ButtonProps = {
    confirmReset: boolean;
    wordDiff: String;
    wordNormal: String;
    handleConfirmReset: () => void;
    handleResetClick: () => void;
}

const ConfirmReset: React.FC<ButtonProps> = ({confirmReset, wordDiff, wordNormal, handleConfirmReset, handleResetClick}) => {
  return (
    <div>
      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-white w-80 md:w-100 h-100 p-6 rounded-md border-2 flex flex-col items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">Do You Want To Reset</h1>
            <div className="flex flex-col gap-4 text-xl">
              <p>
                Difference Word: <strong>{wordDiff}</strong>
              </p>
              <p>
                Normal Word: <strong>{wordNormal}</strong>
              </p>
            </div>

            <div className="flex gap-4">
              <ButtonCancel handleConfirmReset={handleConfirmReset} />

              <ButtonConfirm handleResetClick={handleResetClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmReset
