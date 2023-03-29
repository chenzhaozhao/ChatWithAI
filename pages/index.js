import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { marked } from 'marked';
import Image from "next/image";
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState([]);
  const logProgress = (reader) => {
    return reader.read().then(({ value, done }) => {
      const enc = new TextDecoder('utf-8');
      const message = enc.decode(new Uint8Array(value))
      if (message && !done) {
        try {
          const nextmsg = JSON.parse(message);
          setResult((preValue) => {
            const last = preValue[preValue.length - 1];
            if (last.id === nextmsg.id) {
              const newV = preValue;
              newV[newV.length - 1] = nextmsg
              return newV
            } else {
              return [...preValue, nextmsg]
            }

          })
          setOn(() => false)
        } catch {

        }


      }
      if (done) {

        return;
      }
      return logProgress(reader);
    });
  };
  const submit = async (event) => {
    event.preventDefault();
    if(!animalInput) return 
    setResult((preValue) => [...preValue, { role: 'user', text: animalInput, id: Date.now() }]);
    try {
      const response = await fetch("https://chatbot.theb.ai/api/chat-process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          options
            :
            {},
          prompt: animalInput
        }),
      })
      const reader = await response.body.getReader()
      await logProgress(reader);
      setAnimalInput("");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <Head>
        <title>chatbot</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles['w-full']}>
          {result?.map(({ text, role, id }) =>
            <div
              key={id}
              style={{ lineHeight: '24px' }}
              className={`${styles.flex} ${styles['mb-20']} ${role === 'assistant' ? styles['left'] : styles['right']}`} >
              <div className={`${styles.flex} ${role === 'assistant' ? styles['left'] : styles['right']}`}>
                <div className={`${styles['avtar']}`}><Image alt="user" width={24} height={24} src={role === 'assistant' ? '/bot.png' : '/avatar.jpg'} /></div>
                <div className={styles.item}>
                  {text}
                </div>
              </div>
            </div>
          )}
        </div>
        <footer className={styles.footer}>
          <textarea value={animalInput} placeholder="ask me anything..." className={styles['flex-1']} onChange={(e) => setAnimalInput(e.target.value)}></textarea>
          <span onClick={submit} className={styles.send}>
            <img src='/send.svg'></img>
          </span>
        </footer>

      </main>
    </div>
  );
}
