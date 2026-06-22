// Problem
What's Hiding Amongest the Crowd?

A word is on the loose and now has tried to hide amongst a crowd of  tall letters? Help write a function to detect what the word is, knowing the following rules:

- The wanted word is in lowercase.
- The crowd of letters is all in uppercase.
- Note that the word will be spread out amongst the random letters, but their letters remain in the same order.

Examples
findHiddenWord("UcUNFYGaFYFYGtNUH") -> "cat"

U 
Check if small or upperCase
Not
Skip

c  
Check if small or upperCase
Yes
Write it down some where

continue till the end

collect the lower case letters together keeping their order 
That is answer


findHiddenWord("bEEFGuFBRrHgUHlNFYaYr") -> "burglar"

findHiddenWord("YFemHUFBbezFBYzFBYFBYLLeGBYEFGBMENTment") -> "embezzlement"
