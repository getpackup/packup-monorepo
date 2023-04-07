import React, {
  forwardRef,
  useRef,
  useCallback,
  useImperativeHandle,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from 'react'
import confetti from 'canvas-confetti'

import type { ReactNode } from 'react'

import type {
  Options as ConfettiOptions,
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
} from 'canvas-confetti'

// our API exposed
interface Api {
  fire: (options?: ConfettiOptions) => void
}

interface Props extends React.ComponentPropsWithRef<'canvas'> {
  options?: ConfettiOptions
  globalOptions?: ConfettiGlobalOptions
  manualstart?: boolean
  children?: ReactNode
}
export type Ref = Api

const ConfettiContext = createContext<Api>({} as Api)

export const Confetti = forwardRef<Ref, Props>((props, ref) => {
  const { options, globalOptions, manualstart = false, children, ...rest } = props
  const instanceRef = useRef<ConfettiInstance | null>(null) // confetti instance

  // our <canvas> DOM ref
  const canvasRef = useCallback(
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        // <canvas> is mounted => create the confetti instance
        if (instanceRef.current) return // if not already created
        instanceRef.current = confetti.create(node, globalOptions)
      } else {
        // <canvas> is unmounted => reset and destroy instanceRef
        instanceRef.current?.reset()
        instanceRef.current = null
      }
    },
    [globalOptions]
  )

  // `fire` is a function that call the instance() with `opts` merged with `options`
  const fire = useCallback(
    (opts = {}) => {
      const instance = instanceRef.current
      if (instance) {
        instance({
          ...options,
          ...opts,
        })
      }
    },
    [options]
  )

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire]
  )

  useImperativeHandle(ref, () => api, [api])

  useEffect(() => {
    if (!manualstart) {
      fire()
    }
  }, [manualstart, fire])

  return (
    <ConfettiContext.Provider value={api}>
      <canvas
        ref={canvasRef}
        {...rest}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
      {children}
    </ConfettiContext.Provider>
  )
})

export const useConfetti = () => useContext(ConfettiContext)

export default Confetti
