module.exports = {
    generateOptions :function(dataRes,id,value,specialReq = ""){
        try {   
            var data = [];
            let i = 0;
            dataRes.forEach(result => {
                const { [id]: valueRes } = result;
                const { [value]: textRes } = result;
                
                if(specialReq == "customer_user"){
                    data[i] = {
                        text:textRes,
                        value:valueRes,
                        inactive:result.inactive,
                        ispdplb:result.ispdplb
                    }
                }else{
                    data[i] = {
                        text:textRes,
                        value:valueRes,
                    }
                }
                i++;    
            });
            return data;   
        } catch (error) {
            throw new Error('something bad happened!');
        }
    },
    replaceEnclosedMark:function(data){
        let res = "";
        try {
            if(data){
                res = data.replace("'","`");
            }else{
                res = data;
            }
        }catch (error) {
            res = data;
        }
        return res;
    }
    
}