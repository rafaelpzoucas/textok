import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Textarea } from '@/components/ui/textarea'
import { useCreateComment } from '@/features/comments/hooks'
import { CommentType } from '@/features/comments/schemas'
import { ContentType } from '@/features/contents/schemas'
import { User } from '@/features/users/schemas'
import { Reply } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { UserBadge } from './user-badge'

const MAX_BODY_LENGTH = 20_000

export function ContentReply({
  user,
  content,
}: {
  content?: ContentType | CommentType
  user: User | null
}) {
  const router = useRouter()
  const [body, setBody] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: createComment, isPending } = useCreateComment()

  function handleOpenDrawer() {
    if (!user) {
      router.push('/login')
      return
    }
    setIsOpen(true)
  }

  function handleReply() {
    if (!user || !content || !body.trim()) return

    createComment(
      { content, body: body.trim() },
      {
        onSuccess: () => {
          setBody('')
          setIsOpen(false)
        },
      },
    )
  }

  function handleCancel() {
    setBody('')
    setIsOpen(false)
  }

  const isBodyValid = body.trim().length > 0 && body.length <= MAX_BODY_LENGTH

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="bg-secondary/50"
          onClick={handleOpenDrawer}
          disabled
        >
          <Reply />
          <span className="hidden sr-only">Responder</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex flex-col items-start gap-2 flex-wrap">
            <span>Respondendo:</span>
            <span className="line-clamp-2 text-muted-foreground text-left bg-secondary/50 p-1 px-2 rounded-lg">
              &quot;{content?.title ?? content?.body}&quot;
            </span>
            <span>
              de <UserBadge username={content?.owner_username} size="sm" />
            </span>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <Textarea
            className="h-[300px]"
            placeholder="Escreva sua resposta..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={MAX_BODY_LENGTH}
          />
          <div className="flex justify-end mt-2">
            <span
              className={`text-xs ${body.length > MAX_BODY_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}
            >
              {body.length}/{MAX_BODY_LENGTH}
            </span>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleReply} disabled={!isBodyValid || isPending}>
            {isPending ? 'Publicando...' : 'Responder'}
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
