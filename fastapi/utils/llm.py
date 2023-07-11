import tiktoken

def get_num_tokens(text: str, model_name) -> int:
    encoding = tiktoken.encoding_for_model(model_name)
    tokens = encoding.encode(text)
    return len(tokens)