import React, { Dispatch, SetStateAction, useState } from "react";
import { type OfficeHour } from "@/types";

interface ModalProps {
  state: OfficeHour;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface ModalStageProps {
  state: OfficeHour;
  stage: Number;
  setStage: Dispatch<SetStateAction<Number>>;
}

const StageOneModal = ({ state, stage, setStage }: ModalStageProps) => {
  return (
    <div className="flex flex-row p-6">
      <span className="text-base font-bold">Join Queue</span>
      <span className="text-2xl font-bold mt-2.5">
        What do you need help with?
      </span>
    </div>
  );
};

const JoinModal = ({ state, showModal, setShowModal }: ModalProps) => {
  const [stage, setStage] = useState<Number>(1);

  return (
    <>
      {showModal && stage == 1 && (
        <StageOneModal state={state} stage={stage} setStage={setStage} />
      )}
      {showModal && stage == 2 && (
        <StageOneModal state={state} stage={stage} setStage={setStage} />
      )}
      {showModal && stage == 3 && (
        <StageOneModal state={state} stage={stage} setStage={setStage} />
      )}
    </>
  );
};

export default JoinModal;
