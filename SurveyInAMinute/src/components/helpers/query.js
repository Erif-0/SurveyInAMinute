export const query = (content,noq,ta,cques)=> {
    return({
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": `Please provide ${noq} questions along with question types for ${content} for the target audience ${ta}and include this custom question "${cques}", if the question type has multiple choices mention the choices in an array. Always mention the question type and choices after the question with a sepeartor ":-:"(sepearator should be none other than ":-:") between each of them(like: question:-:questionType:-:choices:-:mandatory). A question should be always followed by question type followed by choices, if there is no choices please mention it as empty array. Always mention the choices in a choices array.The question types should be one of TextInput, MultiChoice, YesNo, OpinionScale, DateTime, Scale, Ranking, NumberInput, EmailInput. OpinionScale and Scale question do not contain text choices. Also mention if the question is mandatory/not mandatory after the choices with ":-:" sepeartor`}]
    });
  } 