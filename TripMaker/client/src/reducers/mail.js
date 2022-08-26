export default function(userMailInit = "", action) {
    if(action.type == 'saveUserEmailToRedux') {

        return action.userMail
      
      }else{
        return userMailInit
      }


      
}