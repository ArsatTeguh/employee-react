type Props = {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  submit: any;
};

function ConfirmationPopup({ setIsDelete, submit }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-slate-50 relative rounded p-4 lg:p-8 h-[25%] w-[90%] lg:w-1/3">
        <p className="text-base font-semibold pt-6">
          Are you sure you want to delete ?{" "}
        </p>
        <div className="flex items-center justify-end gap-4 absolute bottom-5 right-7 flex-row-reverse">
          <button
            className="px-8 py-2 text-sm bg-red-600 border-2  border-red-600 hover:bg-red-700  text-white rounded"
            onClick={() => submit("/master")}
          >
            Sure
          </button>
          <button
            className="px-8 py-2 text-sm  border-2 border-primary rounded hover:bg-primary hover:text-white"
            onClick={() => setIsDelete(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
