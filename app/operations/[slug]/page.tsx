'use client';

import { PageProps } from "@/types/pages/generic.types";
import { useEffect } from "react";

export default function Operation({ params: { slug } }: PageProps) {
  useEffect(() => {
    console.log(slug)
  }, [slug])
  // useEffect(() => {
  // const ws = new WebSocket('ws://localhost:8080/ws?room=2');

  // ws.onopen = () => console.log('Connected to WS');
  // ws.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   console.log('Message received: ', data);
  // };
  // ws.onclose = () => console.log('Disconnected from WS');
  // ws.onerror = (error) => console.error('WebSocket error: ', error);

  // return () => {
  //   console.log('Closing WS connection');
  //   ws.close();
  // };
  // }, []);

  return (
    <div>page</div>
  )
}