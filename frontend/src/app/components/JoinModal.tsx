import React, { Dispatch, SetStateAction, useState } from "react";
import { type OfficeHour, type Student, type Question, Status } from "@/types";
import TagsSelector from "./TagsSelector";

interface ModalProps {
  state: OfficeHour;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface ModalStageProps {
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
  state: OfficeHour;
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const StageOneModal = ({
  question,
  setQuestion,
  state,
  stage,
  setStage,
  setShowModal,
}: ModalStageProps) => {
  const [generalTagIndex, setGeneralTagIndex] = useState<number>(-1);
  const handleStageChange = () => {
    if (stage == 3) {
      setStage(1);
    } else {
      setStage(stage + 1);
    }
  };

  // @TODO: fetch server-side from course
  const generalTags = ["HW Help", "Conceptual Help", "Follow-up Question"];
  const issueTags = ["Proof Writing", "Master Method", "Induction", "Big O"];
  const feelingTags = [
    "Good - I have a quick question",
    "Confused - I need some help",
    "I'm lost (that's okay)",
  ];

  return (
    <div className="flex absolute left-1/2 top-1/2 z-50 w-screen -translate-x-1/2 -translate-y-1/2 transform items-center justify-center text-left bg-transparent">
      <div className="p-6 bg-white flex flex-col shadow-2xl rounded-lg gap-6 w-[650px]">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="text-base font-bold">Join Queue</span>
            <button onClick={() => setShowModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#393939"
                />
              </svg>
            </button>
          </div>
          <span className="text-2xl font-bold mt-2.5">
            What do you need help with?
          </span>
        </div>

        <div className="flex flex-col">
          <TagsSelector
            tags={generalTags}
            title="General*"
            question={question}
            setQuestion={setQuestion}
            setTagIndex={setGeneralTagIndex}
          />
        </div>

        <div className="flex flex-col">
          <TagsSelector
            tags={issueTags}
            title="Issues (if applicable)"
            question={question}
            setQuestion={setQuestion}
          />
        </div>

        <div className="flex flex-col">
          {generalTagIndex === 2 ? (
            <TagsSelector
              tags={state.tas.map((ta) => ta.name)}
              title="Who did you receive help from?"
              question={question}
              setQuestion={setQuestion}
            />
          ) : (
            <TagsSelector
              tags={feelingTags}
              title="How do you feel about this topic?"
              question={question}
              setQuestion={setQuestion}
            />
          )}
        </div>

        <button
          className="px-5 py-2 mt-8 w-full rounded-[4px] bg-gray-300 text-gray-500 text-sm hover:bg-[#2196F3] hover:text-white"
          onClick={() => handleStageChange()}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

const JoinModal = ({ state, showModal, setShowModal }: ModalProps) => {
  const options = { timeZone: "America/New_York" };
  const [stage, setStage] = useState<number>(1);
  const [question, setQuestion] = useState<Question>({
    question: "",
    tags: [],
    students: [],
    description: "",
    private: false,
    status: Status.WAITING,
    time: new Date(Date.now()).toLocaleTimeString("en-US", options),
  });

  return (
    <>
      {showModal && stage == 1 && (
        <StageOneModal
          question={question}
          setQuestion={setQuestion}
          state={state}
          stage={stage}
          setStage={setStage}
          setShowModal={setShowModal}
        />
      )}
      {/* @TODO */}
      {showModal && stage == 2 && (
        <StageOneModal
          question={question}
          setQuestion={setQuestion}
          state={state}
          stage={stage}
          setStage={setStage}
          setShowModal={setShowModal}
        />
      )}
      {/* @TODO */}
      {showModal && stage == 3 && (
        <StageOneModal
          question={question}
          setQuestion={setQuestion}
          state={state}
          stage={stage}
          setStage={setStage}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default JoinModal;
