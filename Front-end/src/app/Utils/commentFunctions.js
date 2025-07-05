// // import { useDispatch } from "react-redux";

// import { deleteCommentAsync, editCommentAsync, getCommentsForPost } from "@/RTK/Reducers/commentSlice";

// // const dispatch = useDispatch();
// export  const handleSubmitComment = (dispatch,postId) => {
//      if (!isAuthenticated && !user) {
//       toast.error('يجب تسجيل الدخول للإعجاب بالمنشور');
//       return;
//     }
//     if (!commentText.trim()) return;
//     dispatch(submitComment({ postId, content: commentText }))
//       .unwrap()
//       .then(() => {
//         toast.success("تم إضافة التعليق بنجاح");
//         setCommentText("");
//         // setActiveCommentPostId(null);
//       })
//       .catch((err) => {
//         toast.error(
//           err?.response?.data?.message ||
//           err?.message ||
//           (typeof err === 'string' ? err : 'حدث خطأ أثناء إضافة التعليق')
//         );
//       });
//   };
// export const handleEditComment = (commentId, content, postId) => {
//     setEditCommentModal({ open: true, comment: { _id: commentId, content }, postId });
//     setEditCommentText(content);
//   };
//  export const handleEditCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!editCommentText.trim()) {
//       toast.error("لا يمكن إرسال تعليق فارغ");
//       return;
//     }
//     try {
//       await dispatch(editCommentAsync({ commentId: editCommentModal.comment._id, content: editCommentText, postId: editCommentModal.postId })).unwrap();
//       toast.success("تم تعديل التعليق بنجاح");
//       setEditCommentModal({ open: false, comment: null, postId: null });
//       setEditCommentText("");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || err?.message || 'حدث خطأ أثناء تعديل التعليق');
//     }
//   };
//  export const handleDeleteComment = (commentId, postId) => {
//     dispatch(deleteCommentAsync({ commentId, postId }));
//     toast.success("تم حذف التعليق بنجاح");
//   }
//  export const fetchCommentsForPost = (postId) => {
//     dispatch(getCommentsForPost(postId));
//   }

