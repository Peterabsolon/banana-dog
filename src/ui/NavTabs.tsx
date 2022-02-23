import { ReactNode, useState } from 'react'
import * as C from '@chakra-ui/react'

export interface NavTabsProps {
  tabs: { label: string; component: ReactNode | (() => ReactNode) }[]
  storageKey: string
}

export const NavTabs = ({ tabs, storageKey }: NavTabsProps) => {
  const [tabIndex, setTabIndex] = useState<number>(Number(localStorage.getItem(storageKey)) || 0)

  const handleSetTab = (tabIndex: number) => {
    localStorage.setItem(storageKey, tabIndex.toString())
    setTabIndex(tabIndex)
  }

  const component = tabs[tabIndex]?.component

  return (
    <>
      <C.Tabs defaultIndex={tabIndex} maxWidth={1024} m="0 auto">
        <C.TabList>
          {tabs.map(({ label }, index) => (
            <C.Tab key={label} onClick={() => handleSetTab(index)}>
              {label}
            </C.Tab>
          ))}
        </C.TabList>

        {typeof component === 'function' ? component() : component}
      </C.Tabs>
    </>
  )
}
