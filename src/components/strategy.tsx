'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { strategyEnum, StrategyType } from '@/features/contents/schemas'
import { cn } from '@/lib/utils'
import { useQueryState } from 'nuqs'

// Mapeamento das estratégias com seus labels
const strategyOptions: Record<StrategyType, string> = {
  relevant: 'Relevantes',
  new: 'Recentes',
} as const

export function Strategy() {
  const [strategy, setStrategy] = useQueryState('strategy', {
    defaultValue: 'relevant' as StrategyType,
    parse: (value) => {
      const result = strategyEnum.safeParse(value)
      return result.success ? result.data : 'relevant'
    },
    serialize: (value) => value,
    clearOnDefault: false,
  })

  // Função wrapper para lidar com a tipagem
  const handleStrategyChange = (value: string) => {
    const result = strategyEnum.safeParse(value)
    if (result.success) {
      setStrategy(result.data)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4">
      <RadioGroup
        value={strategy}
        onValueChange={handleStrategyChange}
        className="w-fit mx-auto bg-background rounded-lg"
      >
        <div className="flex flex-row bg-primary/15 rounded-lg p-1 gap-1">
          {strategyEnum.options.map((option) => (
            <div key={option} className="relative">
              <RadioGroupItem
                value={option}
                id={option}
                className="peer absolute opacity-0"
              />
              <Label
                htmlFor={option}
                className={cn(
                  'block px-6 py-2 rounded-md cursor-pointer transition-all duration-200 text-sm font-medium text-muted-foreground',
                  'hover:bg-background/50',
                  strategy === option && 'bg-primary/50 text-white shadow-sm',
                )}
              >
                {strategyOptions[option]}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
