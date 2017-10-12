export default function({dispatch}){
    return next=>action=>{
        if (!action.payload||!action.payload.then){//if action doesnot have payload or payload does not have a .then property,send it on
            return next(action);
        }

        action.payload
            .then(function(response){
                //create a new action with the old type,but replace the promise with the response data
                const newAction ={...action, payload:response};
                console.log(newAction)
                dispatch(newAction);//不同于next(),dispatch是完全重新走一遍这些middleware    
            });
        
        //action 一直在middleware里通过next传，如果后面没有middleware了，就传给reducer了。
    }
    /*return function(next) {
        return function(action){
            console.log(action);
            next(action);
        }
    }*/
}