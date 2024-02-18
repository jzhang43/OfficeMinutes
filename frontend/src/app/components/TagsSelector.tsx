"use client";

import React, { Dispatch, SetStateAction } from "react";
import { type Question } from "@/types";

interface Props {
  tags: string[];
  title: string;
  question: Question;
  setQuestion: Dispatch<SetStateAction<Question>>;
  setTagIndex?: Dispatch<SetStateAction<number>>;
}

const TagsSelector = ({
  tags,
  title,
  question,
  setQuestion,
  setTagIndex,
}: Props) => {
  const handleUpdateQuestion = (newTag: string, newTagIndex: number) => {
    const updatedQuestion = { ...question };

    if (newTag === "Follow-up Question") {
      updatedQuestion.tags = updatedQuestion.tags.filter(
        (tag) => tag !== "HW Help" && tag !== "Conceptual Help"
      );
      updatedQuestion.tags.push(newTag);
    } else if (newTag === "HW Help" || newTag === "Conceptual Help") {
      updatedQuestion.tags = updatedQuestion.tags.filter(
        (tag) => tag !== "Follow-up Question"
      );
      updatedQuestion.tags.push(newTag);
    } else {
      // Remove the tag if it already exists
      if (updatedQuestion.tags.includes(newTag)) {
        updatedQuestion.tags = updatedQuestion.tags.filter(
          (tag) => tag !== newTag
        );
      } else {
        updatedQuestion.tags.push(newTag);
      }
    }

    setQuestion(updatedQuestion);
    if (setTagIndex) setTagIndex(newTagIndex);
  };

  return (
    <>
      <span className=" text-gray-600/70 text-base font-normal">{title}</span>
      <div className="flex flex-row gap-2.5 mt-2.5">
        {tags.map((tag, index) => (
          <button
            className="py-1 px-2 rounded-full text-sm"
            key={index}
            onClick={() => handleUpdateQuestion(tag, index)}
            style={{
              backgroundColor: question.tags.includes(tag) ? "#2196F3" : "#fff",
              color: question.tags.includes(tag) ? "#fff" : "#000",
              border: question.tags.includes(tag)
                ? "1px solid #2196F3"
                : "1px solid rgb(209 213 219)",
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
};

export default TagsSelector;
