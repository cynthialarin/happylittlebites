import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
          <span className="text-5xl mb-4">😓</span>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4 text-sm">An unexpected error occurred. Please try again.</p>
          <Button onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}>
            Go Home
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
