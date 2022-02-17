## install 

```
npm install slatejsx

```

## living demo

http://seditor.open.heyphp.com/

## usage


```
import SEditor from 'slatejsx';
import 'slatejsx/dist/index.css';

const config = [
  {
   "type": "paragraph",
   "title": "h1",
   "children": [
    {
     "text": ""
    }
   ]
  }
 ]

function App() {
  return (
        <SEditor
          value={config}
          plugins={[]}
          readOnly={false}
        />
  );
}

export default App; 

···