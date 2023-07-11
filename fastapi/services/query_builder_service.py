from typing import List
from langchain import OpenAI
from config import Config, Singleton
from models.chat import ConversationMessage


config = Config()

class QueryBuilderService(metaclass=Singleton):
    _EXAMPLES = [
        """
        << Example 1>>
        USER QUERY:
            explain the mechanism it relies on
            
        CONVERSATION HISTORY:
            Human: what is the transformer architecture?
            AI: The transformer architecture is a model architecture that relies entirely on self-attention mechanisms to compute representations of input and output sequences without using recurrent neural networks (RNNs) or convolutions. It was first introduced in the paper "Attention Is All You Need" by Vaswani et al. (2017).The transformer architecture consists of an encoder and a decoder. The encoder maps an input sequence to a sequence of continuous representations, while the decoder generates an output sequence one element at a time. The key component of the transformer is the self-attention mechanism, which allows the model to capture dependencies between different positions of the input or output sequences. This attention mechanism enables the model to model long-range dependencies and improve parallelization, making it more efficient and effective for tasks like machine translation, text summarization, and language modeling.The transformer architecture has achieved state-of-the-art performance on various natural language processing tasks and has become a popular choice for sequence modeling tasks due to its ability to capture global dependencies and its parallelizability.
            
        SEARCH QUERY:
            self-attention mechanism principles
        """,
        """
        << Example 2>>
        USER QUERY:
            extract the key points to doing a great work
        
        CONVERSATION HISTORY:
            The key points to doing great work can be summarized as follows:
            1. Work on something you're deeply interested in: Interest will drive you to work harder and be more dedicated to your work.
            2. Be driven by curiosity, delight, and the desire to do something impressive: These motivations will push you to explore new ideas and push the boundaries of your work.
            3. Choose the right field and project: Find something that aligns with your natural aptitude and deep interest, and offers scope for great work.
            4. Embrace the process of figuring out what to work on: It may take time and experimentation to discover what truly excites you.
            5. Be ambitious but open to changing your path: It's okay to switch projects or fields if you discover something more exciting along the way.
            6. Optimize for interestingness: Choose work that becomes increasingly interesting as you learn more about it.
            7. Embrace your unique interests and tastes: Don't worry if your interests differ from others. Unique tastes often lead to strong and productive work.
            8. Surround yourself with positive and supportive people: Seek out individuals who inspire and energize you, and avoid those who bring you down.
            
        SEARCH QUERY:
            Optimize for interestingness
        """
    ]

    _PROMPT = """
    Your goal is to build a simple search query from the user's prompt that is expected to match the contents of documents.
    Do not answer the user's prompt, just build a search query, that describes the user's intent.
    If the user's prompt contain domain-specific entities, make sure to include them in the query.
    If the history is provided, use it to add context to the current query.
    
    EXAMPLES:
    {examples}
    
    CONVERSATION HISTORY:
    {history}
    USER PROMPT:
    {prompt}
    SEARCH QUERY:
    """

    def __init__(self):
        self.llm = OpenAI(
            model_name=config.fast_llm_model,
            temperature=0.1,
        )

    def build_query(self, query: str, conversation_history: List[ConversationMessage]) -> str:
        # TODO: sanitize token window
        prompt = self._PROMPT.format(
            history="\n".join([f"{message.message.type}: {message.message.content}" for message in conversation_history]),
            prompt=query,
            examples="\n".join(self._EXAMPLES)
        )
        completion = self.llm(prompt)
        print('search query: ', completion)
        return completion