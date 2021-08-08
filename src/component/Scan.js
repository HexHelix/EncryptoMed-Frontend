import React ,{useEffect,useState} from 'react'

export const Scan = (data,qrscan) => {
    const [found,setFound] = useState({info:'',bool: true});

    useEffect (()=>{
        if(qrscan!==''){
            setFound({info:'0',bool: false});
            data.forEach(element => {
                if (element[2] === qrscan) {
                    console.log("found!")
                    setFound({info: element, bool:true});

                    console.log(element);
                }
                
            
            }
            );
        }

    },[qrscan]);
    
    return found;
}
