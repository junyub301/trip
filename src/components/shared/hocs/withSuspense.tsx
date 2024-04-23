import { Suspense, ComponentType, ReactNode } from 'react'

export default function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return (props: Props) => {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}
