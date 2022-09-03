import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllConversations, getUser } from "../../api";

import { getApiJson } from "../../controllers/APICtrl";
import { waitFor } from "../../controllers/TimeCtrl";

import { removeConversationData, setConversationData, setRefetchConversation } from "../../store/slice/conversationSlice";

import { removeUserData, setUserData } from "../../store/slice/userSlice";


const FetchBaseData = () => {

  const dispatch = useDispatch()

  const { available } = useSelector((store: any) => store.user)

  const { refetchConversation } = useSelector((store: any) => store.conversation)

  useEffect(() => {

    // Fetch User Data
    const fetchUser = async () => {

      dispatch(setRefetchConversation(false))

      const userData = await getApiJson(getUser())

      if (userData.error) dispatch(removeUserData())

      else dispatch(setUserData(userData))

      return userData

    }

    // Fetch Conversation Data
    fetchUser().then(async userData => {

      if (userData.error) return dispatch(removeConversationData())

      const conversationData = await getApiJson(getAllConversations())

      if (conversationData.error) { dispatch(removeConversationData()); dispatch(removeUserData()) }

      else dispatch(setConversationData(conversationData))

    })

  }, [dispatch])

  useEffect(() => {

    // Fetch Conversation Data
    const fetchConversationData = async () => {

      dispatch(setRefetchConversation(false))

      const conversationData = await getApiJson(getAllConversations())

      if (conversationData.error) { dispatch(removeConversationData()); dispatch(removeUserData()) }

      else dispatch(setConversationData(conversationData))

    }

    if (available && refetchConversation) fetchConversationData()

  }, [dispatch, available, refetchConversation])

  return <></>

}

export default FetchBaseData