import React, { useState } from "react";
import {
  Button,
  Flex,
  FormInput,
  Heading,
  Text
} from "@sparrowengg/twigs-react";
import { Input, Select } from "@sparrowengg/twigs-react";
import { query } from "../components/helpers/query";
import { generateQuestion } from "../components/helpers/generateQuestions";
import { createSurvey } from "../components/helpers/createSurvey";
import createQuestions from "../components/helpers/createQuestions";
import {  ChevronRightIcon, SearchIcon } from "@sparrowengg/twigs-react-icons";

const Main = ({ client }) => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleSubmit(e) {
    try {
      setIsDisabled(true);
      const response = await generateQuestion(query(text), client);
      const questionsArray = response?.choices[0]?.message?.content.split("\n");
      const creatSurveyRes = await createSurvey(text, client);

      const surveyObject = JSON.parse(creatSurveyRes).body;
      const surveyId = surveyObject?.data?.id;

      const len = questionsArray.length;
      await createQuestions(len, questionsArray, surveyId, client);
      document.getElementById("InputForChatGpt").value = "";
      document.getElementById("NumberofQuestions").value = "";
      document.getElementById("TargetAudience").value = "";
      document.getElementById("CustomQuestion").value = ""; 
      client.interface.alertMessage("Survey Generated Successfully", {
        type: "success"
      });
    } catch (error) {
      document.getElementById("InputForChatGpt").value = "";
      document.getElementById("NumberofQuestions").value = "";
      document.getElementById("TargetAudience").value = "";
      document.getElementById("CustomQuestion").value = ""; 
      client.interface.alertMessage(
        "Error while generating the survey. If your survey is malformed kindly delete it.",
        { type: "failure" }
      );
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      css={{
        height: "100vh"
      }}
    >
      <Heading
        css={{
          fontFamily: "Poppins",
          
          textAlign: "center",
          color: "$black900",
          letterSpacing: "0.5px",
          marginBottom: "$1",
          
        }}
        size="h1"
        weight="$9"
      >
        Make a Survey using 
        
      </Heading>

      <Heading
        css={{
          fontFamily: "Poppins",
          textAlign: "center",
          color: "$black900",
          letterSpacing: "1px",
          marginBottom: "$3",
          
        }}
        size="h1"
        weight="$1"
      >
         
        AI in a Minute
      </Heading>

      
      <Text
        size="lg"
        css={{
          marginTop: "$7",
          
          marginBottom: "$7",
          maxWidth: 850,
          textAlign: "center",
          letterSpacing: "4px",
          color: "$neutral800",
          
        }}
        
      >
        ANSWER THE FOLLOWING QUESTIONS TO CREATE A SURVEY
        
        </Text>
        
        
          
     
      
      
      

      <Flex alignItems="flex-end" css={{ marginTop: "$9", marginBottom: "$9" }}>
        <FormInput
          css={{ width: 550,marginBottom: "$6", 
          borderColor: "$accent400", borderWidth:"$xl",
          

          
        
        }}
          id={"InputForChatGpt"}
          size="xl"
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Enter The Premise of The survey "
          leftIcon={<SearchIcon />}
          
        />
        
      </Flex>

      <Text
        
        css={{
          marginBottom: "$6",
          maxWidth: 850,
          textAlign: "left",
          color: "$black800",
          marginRight: "$4"
          
        }}
        size="xl"
        weight="bold"
      >
        How many Questions Do you want in your Survey? 
        
        <Input 
        id={"NumberofQuestions"}
        onChange={(e) => {
          setText(e.target.value);
        }}
        css={{
          
          maxWidth: 50 ,
          maxHeight: 50,
          marginLeft:"$3",
          color: "$black900"
        }} placeholder='0' />

      </Text>


      <Text
        size="md"
        css={{
          marginBottom: "$6",
          maxWidth: 850,
          textAlign: "left",
          color: "$black800"
        }}
        
        weight="bold"
      >
        Do you want to Specify Target Audience for the Survey: 
        
        <Input 
        id={"TargetAudience"}
        onChange={(e) => {
          setText(e.target.value);
        }}
        css={{
          
          maxWidth: 150 ,
          maxHeight: 150,
          marginLeft:"$5",
          color: "$black900",
          '&:active': {
            border: '$accent900'},
            outlineColor: '$accent900',
        }} placeholder='Audience' />

      </Text>

      <Text
        size="md"
        
        weight="bold"
        css={{
          marginBottom: "$16",
          marginTop: "$3",
          maxWidth: 850,
          textAlign: "center",
          color: "$black800"
        }}
      >
        Would You Like to add a Custom Question ?

        
        
        <Input  
        css={{
          marginTop: "$4"
        }}
        
        id={"CustomQuestion"}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder='Custom Question' />

      </Text>
      



      <Button
          size="xl"
          
          disabled={isDisabled || !text}
          onClick={handleSubmit}
          rightIcon={<ChevronRightIcon />}
          css={{
            color: "$negative100",
            backgroundColor:"$accent400",
            marginTop: "$9",
            '&:hover': {
              backgroundColor: '$accent600'
            },
            '&:active': {
              backgroundColor: '$accent900'}
            
          }}
        >
          Generate 
        </Button>
    </Flex>
  );
};
export default Main;