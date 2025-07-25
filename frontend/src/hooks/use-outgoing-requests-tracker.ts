import { useEffect, useState } from "react"

export const useOutgoingRequestsTracker = (outgoingFriendReqs: any[]) => {
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())

  useEffect(() => {
    const outgoingIds = new Set()
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id)
      })
      setOutgoingRequestsIds(outgoingIds)
    }
  }, [outgoingFriendReqs])

  return outgoingRequestsIds
}
