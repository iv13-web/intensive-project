import {useSelector} from 'react-redux'
import {getNotifications} from '../store/notificationSlice'

export default function Notifications() {
  const notifications = useSelector(getNotifications)

  return <Notifications notifications={notifications}/>
}