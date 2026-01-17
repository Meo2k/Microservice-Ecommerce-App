type StringMsgResult = {
    required_error?: string;
    invalid_type_error?: string;
}

export const stringMsg = (field: string):StringMsgResult => ({
  required_error: `${field} is required`,
  invalid_type_error: `${field} must be a string`,
});