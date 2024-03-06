enum TokenType {
  Begin_Object = "{",
  End_Object = "}",
}

interface TokenNode<T extends TokenType> {
  type: T;
}

interface TokenValueNode<T extends TokenType> extends TokenNode<T> {
  value: string;
}

type Token =
  | TokenNode<TokenType.Begin_Object>
  | TokenNode<TokenType.End_Object>;
