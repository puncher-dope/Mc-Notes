import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          На главную
        </Button>
      }
    />
  );
};

