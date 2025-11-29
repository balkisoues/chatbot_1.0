need to add a .env with langgraph credentials in studio folders

## to run : 
langgraph dev cmd inside studio


## to run ollama instead of gpt
remove this line ' llm = ChatOpenAI(model="gpt-4o") ' 
and replace it with 

llm = ChatOllama(
    model="qwen3:8b",   
    validate_model_on_init=True,
    temperature=0.4,
    num_predict=512,
    top_p=0.9
)

##whichever qwen model used

##add library also
from langchain_ollama import ChatOllama
