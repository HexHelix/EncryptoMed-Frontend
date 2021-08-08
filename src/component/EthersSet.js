import { ethers } from "ethers";
import SimpleStorage from "../contracts/SimpleStorage.json";
import  { useEffect,useState } from "react";

export const EthersSet = (data) => {
  const [state, setState] = useState({ data: '', loading: true });
  const [items,setItems] = useState('');

  useEffect(() => {
    setState(state => ({ data: '', loading: true }));
    const CONTRACT_ADDRESS = SimpleStorage.networks["5777"].address;

    async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function setValue() {
      
      if (data===undefined||!data.numValue) return;
      console.log('set ran')
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          SimpleStorage.abi,
          signer
        );
        const transaction = await contract.AddManf(
          data.numValue,
          data.medicine
        );

        await transaction.wait();
        //getValue();
      }
    }

    setValue();
    

    async function getValue() {
      console.log('get ran')
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          SimpleStorage.abi,
          provider
        );
        
        const item = await contract.items();
        setItems(item.toNumber());

        //const myObj = JSON.parse(data);
        console.log("items: ", items);

        var a = [];

        
          for (let i = 0; i <= items; i++) {
            try {
              const data = await contract.CheckManf(i);
              //console.log(data);
  
              const parsedData = [data[0].toNumber(), data[1]];
              a = [...a, parsedData];
              //console.log(a);
  
              //const myObj = JSON.parse(data);
              //console.log("items: ", items.toNumber());
              //console.log("data: ", data[0].toNumber(), data[1]);
              //console.log(medicineList)
            } catch (err) {
              console.log("Error: ", err);
            }
          }
          
          setState(()=> {return{ data: a, loading: false }});


        


        
        
      }
    }

    getValue();
  }, [data]);

  return state;
};
