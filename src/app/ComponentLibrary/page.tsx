'use client';
import { SnippetEditor } from '@/entities';
import styles from './page.module.scss';
import { CheckBox, Button, TextInput, SelectBox } from '@/shared';
import { Suspense, useState } from 'react';

export default function Home() {
  const syntaxOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
  ];

  const [code, setCode] = useState(`
    function greet(name) {
      return 'Hello, ' + name + '!';
    }

    console.log(greet('World'));
  `);
  return (
    <main className={styles.main}>
      <Button color="black">Black Button</Button>
      <Button color="white">White Button</Button>
      <Button color="red">Red Button</Button>
      <Button color="green">Green Button</Button>
      <Button color="black" disabled>
        Disabled Black Button
      </Button>
      <Button color="white" disabled>
        Disabled White Button
      </Button>
      <Button color="red" disabled>
        Disabled Red Button
      </Button>
      <Button color="green" disabled>
        Disabled Green Button
      </Button>
      <br />
      <CheckBox label="Accept terms and conditions" />
      <CheckBox label="Subscribe to newsletter" disabled />
      <br />
      <TextInput label="Username" />
      <TextInput label="Email" disabled />
      <br />
      <SelectBox label="Select Syntax Highlighting" options={syntaxOptions} />
      <SelectBox label="Disabled Select" options={syntaxOptions} disabled />
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <SnippetEditor
          value={code}
          onChange={() => {
            setCode;
          }}
        />
      </Suspense>
    </main>
  );
}
