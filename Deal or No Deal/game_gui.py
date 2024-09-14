'''
Define DealOrNoDealWindow, which also contains class methods to run the game
'''

#Import modules
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
#Import Game class
from game_classes import Game


class DealApp(App):
    """Define the DealApp class"""
    def build(self):
        return DealOrNoDealWindow()


class DealOrNoDealWindow(GridLayout):
    """Define the DealOrNoDealWindow class"""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.cols = 2

        #Initialize game state
        self._game = Game()
        self._game.randomize_briefcases()

        # Create grid layout for left window column
        self._left_layout = GridLayout(cols=1, rows=2)

        #Create grid layout for briefcase buttons
        self._bcase_layout = GridLayout(cols=7, rows=5,
                             spacing=5, size_hint_y=.9
                             )
        # Create 26 briefcase buttons, add them to left window column
        button_range = [(20, 27), (13, 20), (6, 13), (1, 6)]
        for r in button_range:
            for i in range(r[0], r[1]):
                button = Button(text=str(i))
                button.bind(on_press=self.briefcase_pressed)
                self._bcase_layout.add_widget(button)
        #Create 2 empty placeholder labels for spacing
        label_range = range(2)
        for i in label_range:
            label = Label(text='')
            self._bcase_layout.add_widget(label)

        #Create output label below the briefcase buttons
        self._output_layout = GridLayout(cols=1, rows=1, size_hint_y=.1)
        self._output_label = (Label(text=f"Choose the briefcase "
                                     f"that you think has the most money."))
        self._output_label.halign = "center"
        self._output_layout.add_widget(self._output_label)

        #Add briefcase and output layouts to left window column
        self._left_layout.add_widget(self._bcase_layout)
        self._left_layout.add_widget(self._output_layout)
        
        # Add the left column layout to main grid layout
        self.add_widget(self._left_layout)

        # Create a grid layout for the right window column
        self._right_layout = GridLayout(cols=1, rows=28,
                            spacing=5, size_hint_x=None, width=150
                            )

        # Create labels for money amounts and add to right window column
        for i in range(len(self._game.money_str)):
            money_label = Label(text=self._game.money_str[i])
            money_label.name = self._game.money_str[i]
            self._right_layout.add_widget(money_label)

        # Add decision buttons to last two rows of right window column
        #deal button
        self._deal_button = Button(text="Deal", size_hint_y=None, height=40)
        self._right_layout.add_widget(self._deal_button)
        self._deal_button.bind(on_press=self.deal_pressed)
        #no deal button
        self._no_deal_button = (Button(text="No Deal", size_hint_y=None, height=40))
        self._right_layout.add_widget(self._no_deal_button)
        self._no_deal_button.bind(on_press=self.no_deal_pressed)

        # Add the right column layout to the main grid layout
        self.add_widget(self._right_layout)

    def briefcase_pressed(self, button):
        """Play the game as briefcases are chosen"""
        #On the player's turn, briefcases can be selected
        if self._game.player_turn:
            briefcase_number = button.text
            #Keep track of chosen briefcase
            button.disabled = True
            chosen_bcase = self._game.remain_bcases[int(briefcase_number) - 1]
            chosen_bcase.chosen = True
            #Keep track of player choices left
            self._game.player.choices_left -= 1
            #Loop to grey out a money label, if player has made their first choice
            if self._game.player.player_bcase.first_choice:
                for money_label in self._right_layout.children:
                    if type(money_label) == Label:
                        if money_label.name == f'{chosen_bcase}':
                            money_label.color = [0.3,0.3,0.2,1]
            #On intial round, give the first chosen briefcase to the player
            if self._game.round == 0:
                self._game.player.player_bcase.number = chosen_bcase.number
                self._game.player.player_bcase.value = chosen_bcase.value
                self._game.player.player_bcase.first_choice = True
                button.background_color = [3, 1, 3, 3]
                self._game.round += 1
            #Player has not taken a deal
            if self._game.player.took_deal == False:
                #Check if the player has opened all briefcases
                if len(self._game) == 0:
                    self._output_label.text = (f"Your case contained {self._game.player.player_bcase}." 
                                              f"You win {self._game.player.player_bcase}.Congradulations!"
                                            )
                else:
                    self._output_label.text = (f"You chose case {briefcase_number}.\n" 
                                            f"Please choose {self._game.player.choices_left} more briefcase(s). " 
                                            f"Then click to continue."
                                            )
                #Key: game round number, Value: number of chosen briefcases in current turn
                round_endings = {1: 7, 2: 12, 3: 16, 4: 19, 5: 21, 6: 22, 
                                 7: 23, 8: 24, 9: 25, 10: 26}
                #Count the number of chosen briefcases
                bcases_chosen = len(list(filter(lambda briefcase: briefcase.chosen, 
                                self._game.remain_bcases)))
                #Check if player has chosen all briefcases for the current round
                if (self._game.round in round_endings and 
                bcases_chosen == round_endings[self._game.round]):
                    self._game.player_turn = False
                    self._game.round += 1
                    if self._game.round <= 5:
                        self._game.player.choices_left = 7 - self._game.round
                    else:
                        self._game.player.choices_left = 1
        #If it is the banker's turn
        else:
            self._game.calculate_offer()
            self._game.banker_turn = True
            self._output_label.text = (f"The bank offer is {self._game.offer}. "
                                        f"Deal or No Deal?"
                                        )

    def deal_pressed(self, button):
        """If the player takes the deal, the game ends"""
        #This button only does something on the banker's turn
        if self._game.banker_turn == True:
            self._output_label.text = (f"You win {self._game.offer}. Congradulations!\n"
                                      f"Your case contained {self._game.player.player_bcase}."
                                    )
            self._game.player_turn = True
            self._game.player.took_deal = True

    def no_deal_pressed(self, button):
        """If the player refuses the deal, the game continues"""
        #This button only does somethign on the banker's turn
        if self._game.player.took_deal == False:
            if self._game.banker_turn == True:
                self._game.player_turn = True
                self._game.banker_turn = False
                self._output_label.text = (f"Please choose {self._game.player.choices_left} "
                                            f"more briefcase(s)."
                                            )
