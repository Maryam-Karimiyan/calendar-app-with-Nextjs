"use client"

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import Navbar from '@/components/Navbar'
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import FullCalendarComponent from '@/components/FullCalendarComponent'


export default function Home() {
 
  return (
    <>
     <Navbar/>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <FullCalendarComponent/>

            </main >
    </>
  )
}
