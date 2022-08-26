export default function(reponseQuizz = [], action) {
    if(action.type == 'saveAnswear') {

        var allAnswer = [...reponseQuizz]
        allAnswer.push(action.answerList)

        return allAnswer
      
      }else{
        return reponseQuizz
      }


      
}