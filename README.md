1 . Use Config json 

Setting all the keys using process environment variables becomes very tedious when in need to inject 100 keys. Use hierarchical config approach

2. Storing sensitive information like DB password , use .env


3. Use Async-Await or promises for async error handling
  TODO
  
4. Handle errors centrally, not within an Express middleware. Otherwise, Not handling errors within a single place will lead to code duplication and probably to improperly handled errors
  
5. Use lowerCamelCase when naming constants, variables and functions and UpperCamelCase (capital first letter as well) when naming classes. 
Example
<pre>
// for class name we use UpperCamelCase
class SomeClassExample {}

// for const names we use the const keyword and lowerCamelCase
const config = {
  key: "value"
};

// for variables and functions names we use lowerCamelCase
let someVariableExample = "value";
function doSomething() {}
</pre>

6. Prefer const over let. Ditch the var

7. Use Async Await, avoid callbacks

8. Detect code issues with a linter

9. Your app will likely utilize only 25% of its available resources(!) or even less. Note that a typical server has 4 CPU cores or more, naive deployment of Node.js utilizes only 1. 

10. Use Bcrypt
